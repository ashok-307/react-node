import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { LoaderService } from '../../shared/services/Loader.service';
import { useGetGitHubReposAPIMutation } from '../../store/api/profile.api';
// import { getGitHubReposAPI } from '../../store/slices/profile/profile';

interface ProfileGitHubProps {
    username: string;
}

function ProfileGitHub(props: ProfileGitHubProps) {
    // let dispatchEvent = useDispatch<any>();
    let { repos } = useSelector((state: any) => state.profileReducer);
    let [onGetGitRepos] = useGetGitHubReposAPIMutation();
    let abortGetGitHubRepos: any = null;

    useEffect(() => {
        LoaderService.openModel('Github1');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        abortGetGitHubRepos = onGetGitRepos(props.username);
        abortGetGitHubRepos.unwrap().then(() => {
            LoaderService.closeModel('Github1');
        }).catch(() => {
            LoaderService.closeModel('Github1');
        });
        // dispatchEvent(getGitHubReposAPI(props.username)).then(() => {
        //     LoaderService.closeModel('Github1');
        // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.username]);
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1"> <i className="fab fa-github"></i> Github Repos</h2>
            {
                repos.length > 0 && (
                    <Fragment>
                        <div className="repo bg-white p-1 my-1">
                            <div>
                                <h4><a href='javascript(0);'>Repo One</a></h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Repellat, laborum!
                                </p>
                            </div>
                            <div>
                                <ul>
                                    <li className="badge badge-primary">Stars: 44</li>
                                    <li className="badge badge-dark">Watchers: 21</li>
                                    <li className="badge badge-light">Forks: 25</li>
                                </ul>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </div>
    )
}

export default ProfileGitHub;
