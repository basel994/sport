import News from "@/components/News/News";
import styles from "./page.module.css";
import PageHeader from "@/components/pageHeader/PageHeader";

export default function Home() {
  return (
    <div className={styles.container}>
      <PageHeader title="Latest news" icon="/images/home/news.ico" />
      <News />
    </div>
  );
}
