import csv, io, re, requests, html, datetime
from urllib.parse import urlparse

SRC='https://docs.google.com/spreadsheets/d/181GQmXflgMCCI9awLbzK4Zf0uneQBKoh51wBjNTc8Us/export?format=csv&gid=0'
text=requests.get(SRC,timeout=30).text
rows=list(csv.reader(io.StringIO(text)))

hidx=None
for i,r in enumerate(rows):
    if len(r)>=8 and r[1].strip()=='Company' and r[2].strip()=='Website':
        hidx=i;break
if hidx is None: raise SystemExit('Header not found')

data=[]
for r in rows[hidx+1:]:
    if len(r)<8: continue
    company=r[1].strip(); website=r[2].strip(); size=r[4].strip(); sector=r[5].strip(); batch=r[6].strip(); status=r[7].strip()
    if not company: continue
    data.append({'Company':company,'Website':website,'Team Size':size,'Company Type':sector,'YC Batch':batch,'Dead/Active':status})
    if len(data)>=25: break

session=requests.Session(); session.headers.update({'User-Agent':'Mozilla/5.0'})

def slugify(name):
    s=name.lower().replace('&',' and ')
    s=re.sub(r"[^a-z0-9]+", '-', s)
    return re.sub(r'-+','-',s).strip('-')

def try_yc(company):
    slugs=[slugify(company)]
    for s in slugs:
        u=f'https://www.ycombinator.com/companies/{s}'
        try: r=session.get(u,timeout=20)
        except Exception: continue
        if r.status_code==200 and ('linkedin_url' in r.text or 'batch_name' in r.text):
            return u,r.text
    return '', ''

email_re=re.compile(r'([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})')
li_company_re=re.compile(r'&quot;linkedin_url&quot;:&quot;(https?://www\.linkedin\.com/company/[^&\"]+[^&\"])&quot;')
li_person_re=re.compile(r'&quot;linkedin_url&quot;:&quot;(https?://(?:www\.)?linkedin\.com/in/[^&\"]+[^&\"])&quot;')

for rec in data:
    yc_url,ht=try_yc(rec['Company'])
    comp_li=''; f1=''; f2=''; email=''
    if ht:
        m=li_company_re.search(ht)
        if m: comp_li=html.unescape(m.group(1))
        persons=[html.unescape(x).rstrip('/') for x in li_person_re.findall(ht)]
        # de-dup preserve order
        seen=set(); uniq=[]
        for p in persons:
            if p not in seen:
                seen.add(p); uniq.append(p)
        if uniq: f1=uniq[0]
        if len(uniq)>1: f2=uniq[1]

        decoded=html.unescape(ht)
        found=[e.lower() for e in email_re.findall(decoded)]
        found=[e for e in found if not (e.endswith('@ycombinator.com') or e.endswith('@example.com'))]
        domain=''
        if rec['Website']:
            domain=urlparse(rec['Website']).netloc.lower().replace('www.','')
        # strictly work email = domain match only
        if domain:
            for e in found:
                if e.split('@')[-1].endswith(domain):
                    email=e; break

    rec.update({'Company Linkedin':comp_li,'YC Page Link':yc_url,'Founder 1 Linkedin':f1,'Founder 2 Linkedin':f2,'Email Person':email,'Remark':'Public data only','Date':'2026-02-11'})

fields=['Company','YC Batch','Company Type','Team Size','Dead/Active','Company Linkedin','Website','YC Page Link','Founder 1 Linkedin','Founder 2 Linkedin','Email Person','Remark','Date']
out=io.StringIO(); w=csv.DictWriter(out,fieldnames=fields); w.writeheader()
for r in data: w.writerow({k:r.get(k,'') for k in fields})
open('yc_25_enriched.csv','w',encoding='utf-8',newline='').write(out.getvalue())
print(out.getvalue())
