// src/components/Accordion.tsx
import ButtonIconCircle from '@renderer/components/Button/ButtonIconCircle';
import PrimaryButton from '@renderer/components/Button/PrimaryButton';
import ClockIcon from '@renderer/components/icon/ClockIcon';
import { useNotification } from '@renderer/context/ProviderNotification';
import { calculateTimeDifference } from '@renderer/utils';
import React, { useRef, useState } from 'react';

const Accordion: React.FC<any> = ({ quizTitle, totalRight, data, allQuest, quizExplanation, quizExplanationPDF }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const { setUrlVideo } = useNotification();

    const showPDF = (url: string) => {
        if (typeof (window as any) != 'undefined') {
            (window as any).context?.openExternal?.(url);
        }
    };

    return (
        <div className="accordion-item bg-[#FFFFFF] mb-[25px] px-[32px] py-[20px] rounded-[20px]">
            <div className="flex justify-between items-center cursor-pointer mb-[16px]" onClick={() => setIsOpen(!isOpen)}>
                <div>
                    <h2 className="title-2 text-[20px] leading-[28px] text-[#2C2C2C] mb-[16px]">{quizTitle}</h2>
                    <p className="text-[16px] leading-[14px] text-[#2C2C2C]">
                        Total Correct: {totalRight} / {allQuest}
                    </p>
                </div>
                <div className={`transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                    <ButtonIconCircle />
                </div>
            </div>
            <div className="tabLine">
                <div className="line w-[100%] h-[12px] bg-[#BCC9C9] rounded-[100px] overflow-hidden">
                    <div
                        className="line h-[100%] rounded-[100px]"
                        style={{ width: `${(totalRight / allQuest) * 100}%`, backgroundImage: "url('./images/bg-button.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                    ></div>
                </div>
            </div>
            <div
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
                    transition: 'max-height 0.2s linear',
                    overflow: 'hidden',
                }}
            >
                <div className="pt-[32px] border-t-[1px] border-[#A2C1C1] mt-[20px]">
                    <div className="listScore grid grid-cols-1 gap-x-[100px] gap-y-[20px]">
                        {data.map((section: any, index: number) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h4 className="title-2 line-clamp-1 text-[20px] leading-[28px] text-[#2C2C2C] mb-[6px]">{section.title}</h4>
                                        <p className="text-[16px] leading-[14px] text-[#2C2C2C]">Correct: {section.totalRight}</p>
                                    </div>
                                    <div className="text-[16px] leading-[14px] text-[#1EC28B] flex items-center gap-[10px] px-[26px] py-[14px] rounded-[100px] bg-[#F1FEFF]">
                                        <p className="text-[22px]">
                                            <ClockIcon />
                                        </p>
                                        {section.startTime && section.endTime ? calculateTimeDifference(section.startTime, section.endTime) : ''}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-[16px] mt-[16px] justify-center items-center">
                        <PrimaryButton className="border-[#A2C1C1] border-[1px]">First Performance</PrimaryButton>
                        <PrimaryButton className="border-[#A2C1C1] border-[1px]">View Attempt</PrimaryButton>
                        {quizExplanation && (
                            <PrimaryButton onClick={() => setUrlVideo(quizExplanation)} className="border-[#A2C1C1] border-[1px]">
                                Video Explanation
                            </PrimaryButton>
                        )}
                        {quizExplanationPDF && (
                            <PrimaryButton onClick={() => showPDF(quizExplanationPDF)} className="border-[#A2C1C1] border-[1px]">
                                PDF
                            </PrimaryButton>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
