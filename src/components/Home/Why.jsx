import styles from "../../styles/Home/Why.module.css";


const Why = () => {
  const Datas=[
    {
      id:1,
      icon:<Heart/>,
      title:"Send and Receive Messages",
      text:"Send and Recieve messages instantly. Our platform ensures the utmost security and confidentiality of your conversations."
    },
    {
      id:2,
      icon:<Shield/>,
      title:"Real-Time Tracking of Transactions",
      text:"From listing to closing, all parties involved can stay informed about the progress, ensuring transparency and facilitating efficient decision-making."
    },
    {
      id:3,
      icon:<Star />,
      title:"Secure Exchange of Documents",
      text:"Our platform incorporates permission-based access control, ensuring secure document exchange among the participating parties."
    },
    {
      id:4,
      icon:<Ticket/>,
      title:"Verify Payment from the next party",
      text:"Our platform provides sellers and agents with the ability to authenticate payments made by buyers. This not only fosters trust and transparency but also strengthens the relationship between all parties involved."
    },
    {
      id:5,
      icon:<Location/>,
      title:"Integration of Googlemeet Platform",
      text:"By utilising GoogleMeet, transaction times are accelerated, as it enables face-to-face discussions and efficient decision-making."
    },
    {
      id:6,
      icon:<Pie/>,
      title:"Seamless Onboarding of Additional Parties",
      text:"The seamless onboarding of additional parties to a transaction, such as conveyancers, mortgage brokers, and lenders, ensures effective communication and ensuring comprehensive transaction management."
    },
  ]
  return (
    <section className={styles.Section}>
        <div className={styles.Container}>
            <div className={styles.Header}>
                <p>Why Nutlip?</p>
                <p>{"Nutlip is an innovative Property Technology Platform that offers a seamless online experience for property transactions. Whether you're a buyer, seller, potential tenant, or agent, Nutlip streamlines the process and provides a cutting-edge solution. Experience the present and future of property technology with Nutlip, and discover a world of possibilities at your fingertips."}</p>
            </div>

            <div className={styles.GridContainer}>
              {
                Datas.map(data=>(
                  <>
                    <div key={data.id} className={styles.BoxContainer}>
                        <div className={styles.Box}>
                            <div className={styles.IconContainer}>
                                {data.icon}
                            </div>

                            <div className={styles.title}>
                              <p> {data.title}</p>
                            </div>

                            <div className={styles.text}>
                              <p>{data.text}</p>
                            </div>
                        </div>
                    </div>
                  </>
                ))
              }
            </div>
        </div>
    </section>
  );
};

export default Why;

const Ticket =()=>{
  return(
    <img src="/ticket.svg" alt="" />
  )
}
const Heart =()=>{
  return(
    <img src="/Heart.svg" alt="" />
  )
}
const Shield =()=>{
  return(
    <img src="/shield.svg" alt="shield check" />
  )
}
const Location =()=>{
  return(
    <img src="/Location.svg" alt="" />
  )
}
const Star =()=>{
  return(
    <img src="/Star.svg" alt="" />
  )
}
const Pie =()=>{
  return(
    <img src="/Graph.svg" alt="" />
  )
}