import React from 'react';
import InputSkill from './InputSkills';

const Posts = ({ posts, loading, set }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }


    return (
        <ul className='list-group mb-4'>
            {posts.map(post => (
                <li key={post.id} className='list-group-item'>
                    <div onClick={(e) => set(e.target.innerText)}>
                        {post.skillName}
                    </div>

                </li>
            ))}
        </ul>
    );
};

export default Posts;