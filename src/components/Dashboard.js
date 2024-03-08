import { useState } from 'react';
import {MDBTabsContent, MDBTabsPane, MDBTabs, MDBTabsItem, MDBTabsLink, MDBIcon} from 'mdb-react-ui-kit';
import Profile from './DashboardComponents/Profile';
import Settings from './DashboardComponents/Settings';
import MadeQuizzes from './DashboardComponents/MadeQuizzes';
import UserManagement from "./DashboardComponents/UserManagement";
import QuizManagement from "./DashboardComponents/QuizManagement";
import ContactManagement from "./DashboardComponents/ContactManagement";
import QuestionBank from "./DashboardComponents/QuestionBank";
import PlayedQuizzes from "./DashboardComponents/PlayedQuizzes";

const Dashboard = ({ userIsModOrAdmin }) => {
    const [activeTab, setActiveTab] = useState('profile');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <MDBTabs justify className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick('profile')} active={activeTab === 'profile'}>
                        <MDBIcon fas icon="user-cog" /> Perfil
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick('settings')} active={activeTab === 'settings'}>
                        <MDBIcon fas icon="cog" /> Ajustes
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick('playedQuizzes')} active={activeTab === 'playedQuizzes'}>
                        <MDBIcon fas icon="play" /> Cuestionarios jugados
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick('madeQuizzes')} active={activeTab === 'madeQuizzes'}>
                        <MDBIcon fas icon="list-alt" /> Cuestionarios hechos
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleTabClick('questionBank')} active={activeTab === 'questionBank'}>
                        <MDBIcon fas icon="th-list" /> Banco de preguntas
                    </MDBTabsLink>
                </MDBTabsItem>
                {userIsModOrAdmin && (
                    <>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleTabClick('user-management')} active={activeTab === 'user-management'}>
                                <MDBIcon fas icon="users-cog" /> Manejo de usuarios
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleTabClick('quiz-management')} active={activeTab === 'quiz-management'}>
                                <MDBIcon fas icon="list-ul" /> Manejo de cuestionarios
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleTabClick('contact-management')} active={activeTab === 'contact-management'}>
                                <MDBIcon fas icon="phone-square" /> Manejo de contactos
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </>
                )}
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane open={activeTab === 'profile'}>
                    <Profile />
                </MDBTabsPane>
                <MDBTabsPane open={activeTab === 'settings'}>
                    <Settings />
                </MDBTabsPane>
                <MDBTabsPane open={activeTab === 'playedQuizzes'}>
                    <PlayedQuizzes />
                </MDBTabsPane>
                <MDBTabsPane open={activeTab === 'madeQuizzes'}>
                    <MadeQuizzes />
                </MDBTabsPane>
                <MDBTabsPane open={activeTab === 'questionBank'}>
                    <QuestionBank/>
                </MDBTabsPane>
                {userIsModOrAdmin && (
                    <>
                        <MDBTabsPane open={activeTab === 'user-management'}>
                            <UserManagement/>
                        </MDBTabsPane>
                        <MDBTabsPane open={activeTab === 'quiz-management'}>
                            <QuizManagement/>
                        </MDBTabsPane>
                        <MDBTabsPane open={activeTab === 'contact-management'}>
                            <ContactManagement/>
                        </MDBTabsPane>
                    </>
                )}
            </MDBTabsContent>
        </div>
    );
}

export default Dashboard;