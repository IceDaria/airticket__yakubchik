
interface Props {
    id: string;
}

export const GlobalSVGSelector = ({ id }: Props) => {
    switch (id) {
        case 'arrow-down':
        return (
            <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2_9)">
                    <path 
                    d="M7.415 8.20999L12 12.795L16.585 8.20999L18 9.62499L12 15.625L6 9.62499L7.415 8.20999Z" 
                    fill="white"/>
                </g>
                <defs>
                    <clipPath id="clip0_2_9">
                        <rect width="24" height="24" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        )

        case 'arrow-up':
            return(
                <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1124_171)">
                        <path d="M7.415 15.79L12 11.205L16.585 15.79L18 14.375L12 8.37501L6 14.375L7.415 15.79Z" 
                        fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1124_171">
                            <rect 
                            width="24" 
                            height="24" 
                            fill="white" 
                            transform="matrix(1 0 0 -1 0 24)"/>
                        </clipPath>
                    </defs>
                </svg>
            )
            
    default:      
        return null;
    }
}