import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map((item) => ({ label: item, value: item }));
const LeaderboardContent = () => {
    return (
        <div className="ui-leaderboard-content flex gap-[65px] h-full overflow-hidden justify-between">
            <div className="boxLeft flex flex-col justify-between max-w-[calc(1920px-600px)] w-[50%]">
                <div className="boxLeftTop">
                    <SelectPicker data={data} searchable={false} style={{ width: 400 }} placeholder="Foundation SC 2408" />
                </div>
                <div className="box-decor">
                    <img src="./images/decor-bg.png" alt="" className="w-[100%]" />
                </div>
                <div className="boxLeftBottom flex">
                    <div className="box-1 w-[154px] flex flex-col justify-end items-center">
                        <img src={'./images/top-2.png'} alt="" className="w-[100%]" />
                        <div className="box-color relative h-[274px] w-full z-0 pt-[40px]">
                            <img src={'./images/bg-top.png'} alt="" className="w-[100%] h-[100%] absolute top-0 left-0" />
                            <div className="contentBox relative z-10 text-center">
                                <h4 className="font-bold text-[16px] text-[#fff]">Robert Fox</h4>
                                <div className="tag mx-auto text-[#1EC28B] bg-[#fff] w-fit rounded-[20px] px-[10px] py-[5px] font-semibold">15290</div>
                            </div>
                        </div>
                    </div>
                    <div className="box-1 w-[195px] flex flex-col justify-end items-center">
                        <img src={'./images/top-1.png'} alt="" className="w-[120%] max-w-none" />
                        <div className="box-color relative h-[291px] w-full z-0 pt-[40px]">
                            <img src={'./images/bg-top-2.png'} alt="" className="w-[100%] h-[100%] absolute top-0 left-0" />
                            <div className="contentBox relative z-10 text-center">
                                <h4 className="font-bold text-[16px] text-[#fff]">Robert Fox</h4>
                                <div className="tag mx-auto text-[#1EC28B] bg-[#fff] w-fit rounded-[20px] px-[10px] py-[5px] font-semibold">15290</div>
                            </div>
                        </div>
                    </div>
                    <div className="box-1 w-[154px] flex flex-col justify-end items-center">
                        <img src={'./images/top-3.png'} alt="" className="w-[100%]" />
                        <div className="box-color relative h-[274px] w-full z-0 pt-[40px]">
                            <img src={'./images/bg-top.png'} alt="" className="w-[100%] h-[100%] absolute top-0 left-0" />
                            <div className="contentBox relative z-10 text-center">
                                <h4 className="font-bold text-[16px] text-[#fff]">Robert Fox</h4>
                                <div className="tag mx-auto text-[#1EC28B] bg-[#fff] w-fit rounded-[20px] px-[10px] py-[5px] font-semibold">15290</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="boxRight max-w-[450px] w-[50%]">
                <div className="boxRight">
                    <div className="boxRightTop mb-[30px]">
                        <div className="current-rank bg-orange-200 rounded-full text-center px-[16px] py-[9px] relative z-10">
                            <img src="./images/bg-tag.png" alt="" className="w-[100%] h-[100%] absolute top-0 left-0 object-content" />
                            <div className="text relative z-10 text-[#fff] flex justify-between items-center">
                                <div className="left flex items-center gap-[10px]">
                                    <div className="tag w-[38px] h-[38px] rounded-full bg-[#FA8443] flex items-center justify-center">
                                        <span className="text-[#fff] font-bold text-[16px]">20</span>
                                    </div>
                                    Your Current Rank
                                </div>
                                <div className="right text-[#fff] font-bold text-[16px]">10590</div>
                            </div>
                        </div>
                    </div>
                    <div className="boxRightBottom">
                        {[4, 5, 6, 7, 8, 9, 10, 11].map((rank) => (
                            <div key={rank} className="flex items-center justify-between mb-[30px]">
                                <div className="flex items-center">
                                    <div className="rank-circle bg-[#E7FCF7] rounded-full w-[36px] h-[36px] flex items-center justify-center mr-[20px] font-semibold text-[#000] text-[16px]">
                                        {rank}
                                    </div>
                                    <img src="./images/avt.png" alt="avatar" className="w-[36px] h-[36px] rounded-full mr-[20px]" />
                                    <span className="text-[#000] font-semibold">Cooper Bessie</span>
                                </div>
                                <span className="text-[#3A7364] font-bold">12600</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardContent;
