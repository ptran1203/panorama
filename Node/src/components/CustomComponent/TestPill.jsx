import React from 'react';

import NavPills from "components/NavPills/NavPills.jsx";
import BaseConsumer from '../../BaseComponent/BaseConsumer';
import Button from '../CustomButtons/Button';

class TestPill extends BaseConsumer {

    constructor(props) {
        super(props)
    }

    consumerContent = () => {
        return (
            <NavPills
                color="warning"
                active = {1}    //tab mặc định, truyền number
                //direction = "rtl"
                tabs={[
                    {
                        //tabIcon
                        tabButton: "Profile",
                        tabContent: (
                            <span>
                                <p>
                                    Collaboratively administrate empowered markets via
                                    plug-and-play networks. Dynamically procrastinate
                                    B2C users after installed base benefits.
                                </p>
                                <br />
                                <p>
                                    Dramatically visualize customer directed convergence
                                    without revolutionary ROI. Collaboratively
                                    administrate empowered markets via plug-and-play
                                    networks. Dynamically procrastinate B2C users after
                                    installed base benefits.
                                </p>
                                <br />
                                <p>This is very nice.</p>
                            </span>
                        )
                    },
                    {
                        tabButton: "Settings",
                        tabContent: (
                            <span>
                                <p>
                                    Efficiently unleash cross-media information without
                                    cross-media value. Quickly maximize timely
                                    deliverables for real-time schemas.
                                </p>
                                <br />
                                <p>
                                    Dramatically maintain clicks-and-mortar solutions
                                    without functional solutions.
                                </p>
                            </span>
                        )
                    },
                    {
                        tabButton: "Options",
                        tabContent: (
                            <Button color="facebook">Test</Button>
                        )
                    }
                ]}
            />
        );
    }
}

export default TestPill;