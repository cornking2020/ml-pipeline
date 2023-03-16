import Head from "next/head";
import { MessageDisplay } from "../store/Enums";

interface PageHeaderProps {
  title?: string;
}

function PageHeader(props: PageHeaderProps) {
  const { title } = props;
  return (
    <>
      <Head>
        <meta charSet={`utf-8`} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <title>{title ? title : MessageDisplay.APP_NAME} | HAU</title>
      </Head>
    </>
  );
}

export default PageHeader;