import { useEffect, useState } from "react";
import PageHeader from "./PageHeader";

export default function Reminders({ reminders, add, update, remove }) {
  const [title,setTitle]=useState(""); const [date,setDate]=useState(""); const [time,setTime]=useState("");
  useEffect(()=>{const timer=setInterval(()=>{const now=new Date();reminders.forEach(r=>{if(!r.done&&r.date&&r.time&&`${r.date}T${r.time}`<=new Date(now.getTime()+1000).toISOString().slice(0,16)){if("Notification" in window&&Notification.permission==="granted")new Notification("My Germany",{body:r.title});update("reminders",r.id,{done:true})}})},60000);return()=>clearInterval(timer)},[reminders,update]);
  async function enable(){if("Notification" in window&&Notification.permission==="default")await Notification.requestPermission()}
  function submit(e){e.preventDefault();if(!title.trim()||!date||!time)return;add("reminders",{title:title.trim(),date,time,done:false});setTitle("");setDate("");setTime("")}
  return <><PageHeader title="یادآورها" text="برای کارهای زمان‌دار یادآور بساز."/><button className="soft-button" onClick={enable}>🔔 فعال‌کردن اعلان مرورگر</button><form className="form-card inline-form" onSubmit={submit}><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="مثلاً پیگیری ویزا"/><input type="date" value={date} onChange={e=>setDate(e.target.value)}/><input type="time" value={time} onChange={e=>setTime(e.target.value)}/><button className="primary">افزودن</button></form><div className="list">{reminders.length?reminders.map(x=><article className={`item ${x.done?"done":""}`} key={x.id}><input type="checkbox" checked={x.done} onChange={e=>update("reminders",x.id,{done:e.target.checked})}/><div className="item-main"><strong>{x.title}</strong><small>{x.date} · {x.time}</small></div><div className="actions"><button onClick={()=>remove("reminders",x.id)}>حذف</button></div></article>):<div className="empty">یادآوری ثبت نشده.</div>}</div></>;
}
