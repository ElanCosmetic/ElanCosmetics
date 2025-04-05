import ContactAdrese from "./ContactAdrese"
import Map from "../../components/Map"
import ContactForm from "./contactform/ContactForm"
import ContactTitle from "./ContactTitle"

const ContactPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  return (
    <div className="conatainer mx-auto w-full px-5 md:px-10 py-5 flex flex-col gap-10 max-w-[1800px]">
      <ContactTitle />
      <div className="flex flex-col gap-10 md:gap-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24 text-gray-700">
          <ContactForm />
          <ContactAdrese locale={locale} />
        </div>
        <Map />
      </div>
    </div>
  )
}

export default ContactPage;