/* eslint-disable react/prop-types */


const Title = ({subTitle , title}) => {
    return (
        <div className="text-center mx-auto md:w-4/12">
            <p className="text-[#D99904] italic">--- {subTitle} ---</p>
            <h1 className="text-6xl uppercase py-5 border-y-4 my-6">{title}</h1>
        </div>
    );
};

export default Title;