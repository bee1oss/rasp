import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Group from './pages/Group'
import Login from './pages/Login'
import { Provider } from 'react-redux';  // Redux Provider eklenmiş
import store from './redux/store';  // Redux store eklenmiş
import GroupLayout from './components/shared/GroupLayout'
import AnotherLayout from './components/shared/AnotherLayout'
import AnotherAll from './pages/AnotherAll'
import TeachersLayout from './components/shared/TeachersLayout'
import Teachers from './pages/Teachers'
import AddGroupLayout from './components/shared/AddGroupLayout'
import AddGroup from './pages/AddGroup'
import AddTeacher from './pages/AddTeacher'
import AddAnotherLayout from './components/shared/AddAnotherLayout'
import AddAnotherAll from './pages/AddAnotherAll'
import AddRaspLayout from './components/shared/AddRaspLayout'
import AddRasp from './pages/AddRasp'

function App() {
    return (
        <Provider store={store}>  {/* Redux store'u Provider içine eklenmiş */}
            <Router>
                <Routes>
                    <Route path='/' element={<Login/>}></Route>
                    <Route path="/layout" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                    </Route>
                    <Route path="/groups" element={<GroupLayout />}>
                        <Route index element={<Group />} />
                    </Route>
                    <Route path="/teachers" element={<TeachersLayout />}>
                        <Route index element={<Teachers />} />
                    </Route>
                    <Route path="/anothers" element={<AnotherLayout />}>
                        <Route index element={<AnotherAll />} />
                    </Route>
                    <Route path="/addgroup" element={<AddGroupLayout />}>
                        <Route index element={<AddGroup />} />
                    </Route>
                    <Route path="/addteacher" element={<AddGroupLayout />}>
                        <Route index element={<AddTeacher />} />
                    </Route>
                    <Route path="/addanothers" element={<AddAnotherLayout />}>
                        <Route index element={<AddAnotherAll />} />
                    </Route>
                    <Route path="/addrasp" element={<AddRaspLayout />}>
                        <Route index element={<AddRasp />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        </Provider>
    )
}

export default App
