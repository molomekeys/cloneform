import NavbarPages from "@/components/mycomponent/components/NavbarPages"

function page() {
  return (
   <main className="flex flex-col">
    <NavbarPages/>
    <div>
      <button>Add form</button>
    </div>
   </main>
  )
}
export default page