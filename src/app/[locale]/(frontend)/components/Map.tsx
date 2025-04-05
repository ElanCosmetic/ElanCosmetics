const Map = () => {
    return (
        <div className="w-full h-[450px] overflow-hidden rounded-lg">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d210.02102104343575!2d28.784557061958928!3d46.522900091707115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c9c11ca62b879f%3A0xdda1d5d361538035!2sELAN%20Cosmetic%20Shop%2C%20magazin%20de%20produse%20cosmetice!5e0!3m2!1sro!2s!4v1741285747819!5m2!1sro!2s"
                width="600"
                height="450"
                style={{ border: 0 }}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}

export default Map;