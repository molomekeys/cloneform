import Link from "next/link"
const Navbar = () => {
  return (
 <nav>
    <ul>
       <Link href={'/pages'} >Try it</Link>
    </ul>
 </nav>
  )
}
export default Navbar