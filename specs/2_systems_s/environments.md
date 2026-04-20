# **Environment and Infrastructure Layer** 

Dev and production machines, with warm-backip of prodction machines available if possible.  

### *Sovereign Edge Center* 

* Static IP  
* Simple Ubuntu instance  
* NGINX \+ FastAPI apps or Caddy  
* JSON datastores

### *Backup strategy*

* QNAP → nightly rsync pull  
* Secondary QNAP for redundancy  
* JSON makes backup/restore trivial

### *Power resilience (home infrastructure)* 

* UPS  
* Solar \+ generator integration  
* Redundant internet (Starlink)
