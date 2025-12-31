import Header from "@/components/Header"

const Page = async ({params}:ParamsWithSearch) => {
  const {id}= await params
    return (
    <div className="wrapper page">
        <Header subHeader="chamhaang04@yahoo.com" title="Henry Chan | Career Insiders" userImg= "/assets/images/dummy.jpg"/>
        
        <h1 className="text-2xl font-karla">userID:{id}</h1>
      
    </div>
  )
}

export default Page
