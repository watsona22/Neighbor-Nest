import Header from "../components/Header";
import '../styles/contactPage.css';

function ContactPage() {
  return (
    <div className="contact-page-container">
      <h2>Contact Us</h2>

      <form action="">
        <label htmlFor="name">
          Name
          <input type="text" name="name" id="name" />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="phone">
          Phone
          <input type="tel" name="phone" id="phone" />
        </label>
        <label htmlFor="message">
          Message
          <textarea name="message" id="message" cols="30" rows="10"></textarea>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ContactPage;
