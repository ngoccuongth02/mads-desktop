// src/components/Accordion.tsx
import ButtonIconCircle from '@renderer/components/Button/ButtonIconCircle';
import MarkIcon from '@renderer/components/icon/MarkIcon';
import MarkIconActive from '@renderer/components/icon/MarkIconActive';
import { archiveService } from '@renderer/services/archive';
import { useRef, useState } from 'react';

interface AccordionArchiveProps {
    title: string;
}

const AccordionArchive: React.FC<AccordionArchiveProps> = ({ quiz, section, isMark: _isMark, description, question, customerAnswer, id }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isMarked, setIsMarked] = useState(_isMark);

    const _idCustomerAnswer = customerAnswer?.[0]?.id;

    const handleMark = async () => {
        setIsMarked(!isMarked);
        const res = await archiveService.markArchive({ id, isMark: !isMarked });
        if ((res as any)?.statusCode == 200) {
            setIsMarked(!isMarked);
        }
    };

    return (
        <div className="accordion-item bg-[#FFFFFF] mb-[25px] px-[12px] py-[10px] rounded-[10px]">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center">
                    <div className="mr-4">
                        <img src={'./images/course-12.png'} alt="Course Icon" className="w-[54px] h-[54px]" />
                    </div>
                    <h2 className="title-2 text-[16px] leading-[20px] text-[#2C2C2C]">
                        {section?.title} | {quiz?.name}
                    </h2>
                </div>
                <div className="flex items-center gap-[20px]">
                    <div
                        className="text-[30px] cursor-pointer relative"
                        onClick={(e: any) => {
                            e.stopPropagation();
                            handleMark();
                        }}
                    >
                        {isMarked ? <MarkIconActive /> : <MarkIcon />}
                    </div>

                    <div className={`transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}>
                        <ButtonIconCircle />
                    </div>
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
                <div className="pt-[32px]">
                    <div className="content text-[16px] text-[#2C2C2C] leading-[32px]">
                        <div dangerouslySetInnerHTML={{ __html: description }}></div>
                    </div>
                    <div className="content text-[16px] text-[#2C2C2C] leading-[32px] flex items-start gap-[10px] pt-[20px]">
                        <div className="box w-[40px] h-[40px] bg-[#51F0BA] flex items-center justify-center rounded-full flex-shrink-0">
                            <span className="text-[16px] text-[#FFFFFF]">?</span>
                        </div>
                        <div className="content" dangerouslySetInnerHTML={{ __html: question?.description }}></div>
                    </div>
                    <div className="options-list pt-[20px]">
                        {question?.answers?.map((option: any, index: number) => (
                            <div
                                key={index}
                                className={`option-item p-[14px] rounded-[10px] mb-[12px] flex items-center ${option?.isCorrect ? 'bg-[#51F0BA] text-[#FFFFFF] customContent correct' : 'bg-[#F2FFF8] text-[#2C2C2C]'} ${_idCustomerAnswer == option?._id ? '!bg-[#FF4C4C] text-[#FFFFFF] customContent incorrect' : ''}`}
                            >
                                <span className="font-bold mr-[20px] text-[24px]">{option?.title}</span>
                                <div className="content" dangerouslySetInnerHTML={{ __html: option?.content }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionArchive;
