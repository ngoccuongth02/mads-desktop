const Loading = ({ isLoading }: any) => {
    return (
        <>
            <div
                className="loading"
                style={{
                    opacity: isLoading ? 1 : 0,
                    visibility: isLoading ? 'visible' : 'hidden',
                    transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
                }}
            >
                <div className="loader"></div>
            </div>
        </>
    );
};

export default Loading;
