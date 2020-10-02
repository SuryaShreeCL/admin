import React, { Component } from 'react'
import './Asset/CuratedCourse.css'
import Loading from './Loading'

export default class Curated_Course extends Component {
    constructor(props) {
        super(props);
        this.state = { Loading: true }

    }
    componentDidMount() {
        setTimeout(() => { this.setState({ Loading: false }) }, 2000)
    }
    render() {

        return (
            <div>
                {
                    (this.state.Loading) ? <Loading /> : null
                }
                <div className="curated-root">
                    <div className="container curated-body">
                        <div className="curated-head">
                            <label className="curated-head-label">CareerLabs Curated Course</label>
                        </div>
                        <div className="curated-info">
                            <div className="curated-info-name">
                                <label className="curated-info-name-label">Hi Kiran</label>
                            </div>
                            <div className="curated-info-msg">
                                <div className="messsage">
                                    <p>We had captured your data to help our mentors to understand you better.<br />
                                    These are the courses that will help youbest in your future career.<br />
                                    our mentors will be contacting you shortly to help you furter in your career goals.</p>
                                </div>
                            </div>
                        </div>
                        {this.show}
                        <div className="curated-content row">
                            <div className="curated-item col-4">
                                <div className="item-footer">
                                    <label>Career Track</label>
                                </div>
                            </div>

                            <div className="curated-item col-4">
                                <div className="item-footer">
                                    <label>Career Track</label>
                                </div>
                            </div>

                            <div className="curated-item col-4">
                                <div className="item-footer">
                                    <label>Career Track</label>
                                </div>
                            </div>

                            <div className="curated-item col-4">
                                <div className="item-footer">
                                    <label>Career Track</label>
                                </div>
                            </div>

                            <div className="curated-item col-4">
                                <div className="item-footer">
                                    <label>Career Track</label>
                                </div>
                            </div>

                            <div className="curated-item col-4">
                                <div className="item-footer">
                                    <label>Career Track</label>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        )
    }
}
