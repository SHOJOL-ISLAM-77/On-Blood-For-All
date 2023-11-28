/* eslint-disable react/prop-types */

import { Helmet } from "react-helmet-async";


const HelmetTitle = ({title}) => {
  return (
    <div>
      <Helmet>
        <title>{title} || On Blood For All</title>
      </Helmet>
    </div>
  );
};

export default HelmetTitle;
