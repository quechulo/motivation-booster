import EmailItem from "./EmailItem";
import styles from "./EmailList.module.css";

const EmailList = (props) => {
  const { emails } = props;

  return (
    <>
      {emails.slice(0, 3).map((mail) => (
        <EmailItem className={styles.emaillist} subject={mail.subject} body={mail.body} />
      ))}
    </>
  );
};

export default EmailList;
