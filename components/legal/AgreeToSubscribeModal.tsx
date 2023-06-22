"use client"
import Button from '@/io/Button'
import React, { useState, useEffect } from 'react'




interface AgreeToSubscribeModalProps {
    open: boolean
    setIsOpen: (v: boolean) => void
    agree: () => void
}


const tos: string[] = [
    "Est magna imperdiet cursus velit platea bibendum condimentum vel. Quisque phasellus eget tristique eget tempor finibus, eget pellentesque suspendisse est massa tristique et bibendum, pellentesque habitasse vulputate, faucibus pellentesque euismod at vestibulum elit, arcu convallis finibus diam sed eget. Justo convallis id curabitur eu risus, vulputate nunc massa urna purus ut vestibulum aenean dictumst. Nulla luctus nunc orci in elit, nisl. In tempus ante odio dui, nascetur vitae. Lectus ultricies lectus porta porttitor, et pellentesque lectus imperdiet dui. Pulvinar posuere condimentum vel, eget laoreet ultrices vivamus dignissim eu iaculis etiam tortor, non congue odio ut amet magna eget a lectus sit auctor imperdiet tempus, id etiam platea. Efficitur luctus dui arcu tempor nulla nulla tempor, augue in porta nullam ut lobortis finibus. Ut curabitur imperdiet tristique tristique neque lectus in neque curabitur fermentum tempus cras lectus ultricies varius aenean imperdiet feugiat pretium laoreet porta, feugiat maximus at porttitor, libero turpis.",
    "Habitasse id nisl ipsum vivamus nibh placerat egestas et tempor urna dictum praesent, semper urna tincidunt cursus nec, tincidunt. Tempor vitae eros bibendum, dapibus convallis elit imperdiet venenatis cursus suspendisse, donec dui arcu, vestibulum nec dapibus amet tempus pellentesque ante eu magna. Neque cras tincidunt nunc, massa congue tristique dignissim eros mi cras fusce justo ultrices, faucibus. Imperdiet integer donec dictum varius, porttitor in natoque vulputate dignissim quisque in penatibus dui lorem pharetra efficitur pharetra eget volutpat suscipit tristique nulla ut nulla suscipit ultrices. Ac eleifend laoreet lectus. Convallis cras posuere dignissim ultrices, quisque lectus eleifend dictumst ante habitasse sem condimentum faucibus. Nulla etiam sed molestie imperdiet nec enim sed. Eu sed purus eget amet nulla pellentesque libero pharetra porttitor convallis a. Massa pellentesque sed, porttitor turpis velit posuere convallis vestibulum congue finibus erat varius cras vel suspendisse aenean orci ut dolor iaculis consectetur laoreet vivamus eros phasellus dapibus. Massa convallis est praesent eu auctor eget lectus faucibus ac. Eget finibus non vel non dapibus molestie tristique, consequat tristique massa, aliquam enim aenean, est ultricies lectus, laoreet pulvinar urna convallis et est id, etiam sit. Lectus luctus in nulla, faucibus tincidunt auctor ligula penatibus quisque est dapibus rutrum platea, sed.",
    "Feugiat nunc id convallis iaculis erat tempor pellentesque efficitur auctor eget facilisis at rutrum sem metus ex sit tempor hac consectetur. Purus id sed dictumst vel duis condimentum at ipsum neque. Enim cursus nec integer aenean, ac fermentum non nunc, tempor ipsum eros, elementum vulputate amet tortor. Imperdiet id erat cras dictumst nisl bibendum elementum enim id dapibus nec. Nibh consectetur montes pharetra suspendisse est montes etiam. Molestie convallis tincidunt. Lectus praesent ut enim faucibus in dui dignissim nulla augue,. Tincidunt tempor aliquam aliquam metus, sed ac suspendisse est gravida amet ipsum quis vel malesuada suspendisse iaculis vitae, suspendisse vivamus laoreet at suspendisse dapibus, consectetur nullam. Arcu eu nisi natoque lacus lectus magna proin ipsum lectus felis. Diam quisque at auctor nisl vel quis nunc, fermentum cras hac faucibus et convallis tempor, ut. Tortor metus dolor lorem et tellus consectetur ut consectetur fermentum proin imperdiet, pellentesque ullamcorper curabitur praesent porta,."
]


const AgreeToSubscribeModal = ({ open, setIsOpen, agree }: AgreeToSubscribeModalProps) => {
    const [show, setShow] = useState(open)
    useEffect(() => {
        if (typeof window === "undefined") return;
        setShow(open)
    }, [open])
    if (!show) return null;
    return (
        <>
            <div className={'absolute top-[40px] left-[50%] -translate-x-[50%] bg-[--surface-card] rounded-xl border border-[--surface-border] w-full max-w-[calc(100vw-6rem)] z-[999] px-8 py-6'}>
                <div className={'text-lg font-semibold'}>Terms of Service</div>
                <div className={'max-h-[calc(100vh-200px)] overflow-y-scroll my-4'}>{tos.map((t) => {
                    return <div className={'indent-3 pr-1'}>{t}</div>
                })}</div>
                <div className={'w-full flex flex-row justify-end items-center'}>
                    <Button label="Agree" onClick={agree} />
                </div>
            </div>
            <div className={'w-screen h-screen absolute top-0 left-0'} onClick={() => setIsOpen(false)} />
        </>
    )
}


AgreeToSubscribeModal.displayName = "AgreeToSubscribeModal"


export default AgreeToSubscribeModal;
