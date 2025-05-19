import '../styles/styles2.scss'; 
import back from '../images/back-obj.png'
import FloatingTeam from './FloatingTeam'

function Container2() {
  return (
     <section className="container2">
        <div className="topTextContainer">
            <div className="miniHeading">What We Do</div>
            <div className="largeHeading">We Are Inspired From The User Experience, That's Why We Are..</div>
        </div>
        <div className="topTextContainerRight">
            <div className="rightParagraph">Inspired by the Art of User Experience, Which Drives Us to Craft Innovative, Engaging, and Seamlessly User-Centric Websites. </div>
        </div>
        <FloatingTeam/>
     </section>

  );
}

export default Container2;
