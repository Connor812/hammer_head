import { PostData } from "./PostData";

export function SendQuote(e, formRef, setError, navigate) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(formRef.current);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    if (!name || !email || !phone || !message) {
        setError('Please fill out all required fields.');
        return;
    }

    if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }

    if (!phoneRegex.test(phone)) {
        setError('Please enter a valid phone number in the format 519-718-3002.');
        return;
    }

    const serviceCheckboxes = formRef.current.querySelectorAll('input[type="checkbox"]');
    const selectedServices = Array.from(serviceCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    // If all fields are filled out and valid, you can submit the form data here.
    PostData("send-quote.php", { name, email, phone, services: selectedServices, message })
        .then((response) => {
            if (response.status === 'success') {
                navigate('/quote_success');
            } else if (response.status === 'error') {
                setError("Message failed to send.");
            }
        })
        .catch((error) => {
            setError("Message failed to send. " + error);
        });

}