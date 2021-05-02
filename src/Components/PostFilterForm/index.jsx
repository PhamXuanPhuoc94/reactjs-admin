import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFilterForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
    onSubmit: null,
}
function PostFilterForm(props) {
    const { onSubmit } = props;
    const [searchTern, setSearchTern] = useState('');
    const typingTimeoutRef = useRef(null);

    function handleSearchTernChange(e) {
        const value = e.target.value;
        setSearchTern(value);
        if (!onSubmit) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };

        typingTimeoutRef.current = setTimeout(() => {
            const formValue = {
                searchTern: value,
            }
            onSubmit(formValue)
        }, 500);

    }

    return (
        <form>
            <input type="text" value={searchTern} onChange={handleSearchTernChange} />
        </form>
    );
}

export default PostFilterForm;