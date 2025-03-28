import dividerDesktop from '../images/pattern-divider-desktop.svg'
import dividerMobile from '../images/pattern-divider-mobile.svg'
import dice from '../images/icon-dice.svg'
import { queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';

function Advice() {

    const myOptions = queryOptions({
        queryKey: ['advices'], 
        queryFn: () => 
            axios.get('https://api.adviceslip.com/advice').then(res => {
                return res.data;
            }),
        enabled: false
    })
    // queryOptions로 정의한 옵션 사용
    let result = useQuery(myOptions);


    useEffect(() => {
        result.refetch();
    }, [])

    
    return (
        <div className="
            flex flex-col justify-center items-center 
            bg-dark-blue
            font-manrope font-[800]
            min-h-dvh
            p-[16px]
        ">
            <div className="
                relative
                flex flex-col justify-center items-center
                rounded-2xl bg-dark-grayish-blue
                w-full max-w-[430px]
                px-[24px] py-[40px]
                gap-[12px]
                mobile:px-[40px]
            ">
                <span className="
                    text-[10px] text-neon-green
                ">
                    A D V I C E
                    {result.isSuccess && <>&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;{result.data.slip.id}</>}
                </span>

                <span className="
                    text-center text-[24px] text-light-cyan
                ">
                    {
                        result.isPending
                        ? 'Loading...'
                        : result.isError 
                            ? `There's something wrong...`
                            : result.data.slip.advice
                    }
                </span>

                <img src={dividerDesktop} alt="divider" className="
                    hidden
                    my-4  
                    mobile:block
                "/>

                <img src={dividerMobile} alt="divider" className="
                    my-4
                    mobile:hidden
                "/>

                <div className={`
                    absolute bottom-[-28px]
                    flex justify-center
                    rounded-full bg-neon-green
                    w-[56px] h-[56px]
                    transition-shadow hover:shadow-neon-green hover:shadow-[0_0_32px_0]
                    cursor-pointer
                    ${
                        result.isFetching 
                        && 'pointer-events-none bg-grayish-blue hover:shadow-none'
                    }
                `}
                onClick={() => result.refetch()}
                >
                    <img src={dice} alt="divider" className="object-none"/>
                </div>
            </div>
            <Test myOptions={myOptions} />
        </div>
    )
}

function Test({ myOptions }) {
    
    /* 
    Advice 컴포넌트의 useQuery와 같은 옵션(query key)를 사용함으로써 데이터를 공유함, 호출도 한번만
    하위 컴포넌트 많이 중첩되면 props 전송 대신 useQuery 한번 더 작성하는 것도 좋을듯
    */
    const result = useQuery(myOptions);

    return (
        <div className={`
            absolute
            bottom-0
            right-0
            text-light-cyan
        `}>
            {result.isSuccess && result.data.slip.id}
        </div>
    )
}

export default Advice;