import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Layouts/Button.module.scss";

type Props = {
  href: string;
  checkMessage: string;
  yes: string;
  no: string;
};

const LinkButton: React.FC<Props> = ({ href, checkMessage, yes, no }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleButtonClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = (confirmed: boolean) => {
    setShowConfirmation(false);
    if (confirmed) {
      window.location.href = href;
    }
  };

  const handleConfirmYes = () => {
    handleConfirmation(true);
  };

  const handleConfirmNo = () => {
    handleConfirmation(false);
  };

  return (
    <>
      {showConfirmation && (
        <div className={styles.btnBlink}>
          <Link href={href}>
            <p>{`${checkMessage}で宜しいでしょうか。`}</p>
            <button className={styles.btn} onClick={handleConfirmYes}>
              {yes}
            </button>
          </Link>
          <button className={styles.btn} onClick={handleConfirmNo}>
            {no}
          </button>
        </div>
      )}
    </>
  );
};

export default LinkButton;
