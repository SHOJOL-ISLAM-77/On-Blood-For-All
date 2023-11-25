/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const HelmetTitle = ({title}) => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss || {title}</title>
      </Helmet>
    </div>
  );
};

export default HelmetTitle;
