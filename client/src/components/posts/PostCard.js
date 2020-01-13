import React from 'react';
import {Link} from "react-router-dom";
import {Button, Icon} from "antd";
import "./PostCard.scss";

const PostCard = () => {
    return (
        <div className="post">
            <div className="post-wrapper">
                <div className="post-wrapper__user">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar"/>
                    <h5>Bojan</h5>
                </div>

                <div className="post-wrapper__comment">
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                    <span><b>Posted on:</b> 12-Dec-2019</span>
                    <div className="comments-buttons">
                        <Button type="primary"><Icon type="like" /> <span>5</span></Button>
                        <Button type="primary">
                            <Link to="/">Discussion</Link>
                        </Button>
                        <Button type="danger">
                            <Icon type="delete" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;