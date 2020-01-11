import React from 'react';
import { Link } from 'react-router-dom';


class Landing extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){
    const { currentUser, openModal } = this.props;
    return(
      <div>
        <section className="landing_body">
          <ul>
            <li>
              <div className="welcome_intro">
                <h1>Make more time for the work that matters most</h1>
                <p>Dietsana is the work management platform teams use to stay focused on the goals, projects, and daily tasks that grow business.</p>
                {
                  currentUser ? 
                  <Link className="return" to="/app">Return to my Dietsana</Link> 
                  : 
                  <button className="signup" onClick={() => openModal('signup')}>Try for free</button>
                }
              </div>
              <div>

                <video autoPlay playsInline loop muted className="background-vid" poster="video broke">
                  <source src="https://d1gwm4cf8hecp4.cloudfront.net/videos/homepage/timeline/home-timeline-EN.mp4" type="video/mp4"/>
                </video>


              </div>
            </li>
            <li>
              <div className="intro_highlights">
                <section>
                  <p>Hit deadlines</p>
                  <p>Create visual project plans to see how every step maps out over time. Pinpoint risks. Eliminate roadblocks. Even when plans change.</p>
                </section>
                <section>
                  <p>Get organized</p>
                  <p>Plan and structure work in a way that’s best for you. Set priorities and deadlines. Share details and assign tasks. All in one place.</p>
                </section>
                <section>
                  <p>Stay on Track</p>
                  <p>Follow projects and tasks through every stage. You know where work stands and can keep everyone aligned on goals.</p>
                </section>
              </div>
            </li>

            <li>
              <div className="intro_deadlines_desc">
                <p>Under Construction</p>
              </div>
            </li>

            <li>
              <div className="intro_deadlines_desc">
                <p>Under Construction</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}

export default Landing;