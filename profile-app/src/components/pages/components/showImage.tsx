import React, { Fragment, useState } from 'react'
import { getTheImages } from '../../../services/test';

function ShowImage() {
    const [images, setImages] = useState([]);

    React.useEffect(() => {
        getTheImages().then((res) => {
            setImages(res.data.images);
        }).catch(() => {

        })
    }, []);

    return (
        <div>
            <div className="images-block">
                {
                    images.map((image, ind) => (
                        <Fragment key={ind}>
                            <figure>
                                <img src={image} alt={"image" + ind} style={{ width: '100%'}} />
                            </figure>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default ShowImage;
