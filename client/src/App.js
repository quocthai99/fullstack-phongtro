import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DetailPost, Home, HomePage, Login, Rental, SearchDetail, Contact } from './containers/Public';
import {System, CreatePost, ManagePost, EditAccount} from './containers/System'
import { path } from './ultils/constant';
import * as actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(state => state.auth)

    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(actions.getCurrent())
        }, 100)
    }, [isLoggedIn])

    useEffect(() => {
        dispatch(actions.getPrices());
        dispatch(actions.getAreas());
        dispatch(actions.getProvinces());
    }, []);

    return (
        <div className="w-full h-full overflow-hidden bg-primary">
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path="*" element={<HomePage />} />
                    <Route path={path.HOME__PAGE} element={<HomePage />} />


                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
                    <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
                    <Route path={path.NHA_CHO_THUE} element={<Rental />} />
                    <Route path={path.SEARCH} element={<SearchDetail />} />
                    <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
                    <Route path={path.DETAIL_ALL} element={<DetailPost />} />
                    <Route path={path.CONTACT} element={<Contact />} />
                </Route>
                <Route path={path.SYSTEM} element={<System />} >
                    <Route path={path.CREATE_POST} element={<CreatePost />} />
                    <Route path={path.MANAGE_POST} element={<ManagePost />} />
                    <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
