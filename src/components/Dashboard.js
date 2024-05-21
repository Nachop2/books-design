import { useState } from 'react';
import { MDBTabsContent, MDBTabsPane, MDBTabs, MDBTabsItem, MDBTabsLink, MDBIcon } from 'mdb-react-ui-kit';
import Profile from './DashboardComponents/Profile';
import Settings from './DashboardComponents/Settings';
import MadeQuizzes from './DashboardComponents/MadeQuizzes';
import UserManagement from "./DashboardComponents/UserManagement";
import QuizManagement from "./DashboardComponents/QuizManagement";
import ContactManagement from "./DashboardComponents/ContactManagement";
import QuestionBank from "./DashboardComponents/QuestionBank";
import PlayedQuizzes from "./DashboardComponents/PlayedQuizzes";

const Dashboard = ({ }) => {
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
                    <MDBTabsLink onClick={() => handleTabClick('user-management')} active={activeTab === 'user-management'}>
                        <MDBIcon fas icon="users-cog" /> Manejo de usuarios
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane open={activeTab === 'profile'}>
                    <Profile />
                </MDBTabsPane>
                <MDBTabsPane open={activeTab === 'settings'}>
                    <Settings />
                </MDBTabsPane>
                <MDBTabsPane open={activeTab === 'user-management'}>
                    <UserManagement />
                </MDBTabsPane>
            </MDBTabsContent>
        </div>
    );
}

export default Dashboard;