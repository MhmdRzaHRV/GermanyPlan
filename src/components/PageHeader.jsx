export default function PageHeader({ title, text }) {
  return <header className="page-header"><div><h1>{title}</h1>{text && <p>{text}</p>}</div></header>;
}
