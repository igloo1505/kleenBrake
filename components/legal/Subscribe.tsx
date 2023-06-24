import Button from '@/io/Button'
import React, { useEffect, useState } from 'react'



interface SubscribeModalProps {
    open: boolean
    setIsOpen: (v: boolean) => void
    toggleSubscriptionStatus: () => void
    subscribed: boolean
}

const subscriptionLegalDescription: string[] = [
    "Est magna imperdiet cursus velit platea bibendum condimentum vel. Quisque phasellus eget tristique eget tempor finibus, eget pellentesque suspendisse est massa tristique et bibendum, pellentesque habitasse vulputate, faucibus pellentesque euismod at vestibulum elit, arcu convallis finibus diam sed eget. Justo convallis id curabitur eu risus, vulputate nunc massa urna purus ut vestibulum aenean dictumst. Nulla luctus nunc orci in elit, nisl. In tempus ante odio dui, nascetur vitae. Lectus ultricies lectus porta porttitor, et pellentesque lectus imperdiet dui. Pulvinar posuere condimentum vel, eget laoreet ultrices vivamus dignissim eu iaculis etiam tortor, non congue odio ut amet magna eget a lectus sit auctor imperdiet tempus, id etiam platea. Efficitur luctus dui arcu tempor nulla nulla tempor, augue in porta nullam ut lobortis finibus. Ut curabitur imperdiet tristique tristique neque lectus in neque curabitur fermentum tempus cras lectus ultricies varius aenean imperdiet feugiat pretium laoreet porta, feugiat maximus at porttitor, libero turpis.",
    "Habitasse id nisl ipsum vivamus nibh placerat egestas et tempor urna dictum praesent, semper urna tincidunt cursus nec, tincidunt. Tempor vitae eros bibendum, dapibus convallis elit imperdiet venenatis cursus suspendisse, donec dui arcu, vestibulum nec dapibus amet tempus pellentesque ante eu magna. Neque cras tincidunt nunc, massa congue tristique dignissim eros mi cras fusce justo ultrices, faucibus. Imperdiet integer donec dictum varius, porttitor in natoque vulputate dignissim quisque in penatibus dui lorem pharetra efficitur pharetra eget volutpat suscipit tristique nulla ut nulla suscipit ultrices. Ac eleifend laoreet lectus. Convallis cras posuere dignissim ultrices, quisque lectus eleifend dictumst ante habitasse sem condimentum faucibus. Nulla etiam sed molestie imperdiet nec enim sed. Eu sed purus eget amet nulla pellentesque libero pharetra porttitor convallis a. Massa pellentesque sed, porttitor turpis velit posuere convallis vestibulum congue finibus erat varius cras vel suspendisse aenean orci ut dolor iaculis consectetur laoreet vivamus eros phasellus dapibus. Massa convallis est praesent eu auctor eget lectus faucibus ac. Eget finibus non vel non dapibus molestie tristique, consequat tristique massa, aliquam enim aenean, est ultricies lectus, laoreet pulvinar urna convallis et est id, etiam sit. Lectus luctus in nulla, faucibus tincidunt auctor ligula penatibus quisque est dapibus rutrum platea, sed.",
    "Feugiat nunc id convallis iaculis erat tempor pellentesque efficitur auctor eget facilisis at rutrum sem metus ex sit tempor hac consectetur. Purus id sed dictumst vel duis condimentum at ipsum neque. Enim cursus nec integer aenean, ac fermentum non nunc, tempor ipsum eros, elementum vulputate amet tortor. Imperdiet id erat cras dictumst nisl bibendum elementum enim id dapibus nec. Nibh consectetur montes pharetra suspendisse est montes etiam. Molestie convallis tincidunt. Lectus praesent ut enim faucibus in dui dignissim nulla augue,. Tincidunt tempor aliquam aliquam metus, sed ac suspendisse est gravida amet ipsum quis vel malesuada suspendisse iaculis vitae, suspendisse vivamus laoreet at suspendisse dapibus, consectetur nullam. Arcu eu nisi natoque lacus lectus magna proin ipsum lectus felis. Diam quisque at auctor nisl vel quis nunc, fermentum cras hac faucibus et convallis tempor, ut. Tortor metus dolor lorem et tellus consectetur ut consectetur fermentum proin imperdiet, pellentesque ullamcorper curabitur praesent porta,."
]

const cancelSubscriptionMessage: string[] = [
    "Nec malesuada velit elementum tristique diam ullamcorper a semper etiam ac bibendum nibh ut dignissim aliquet etiam tortor ac tristique, convallis vel ac, vitae tristique ante. Est in vitae velit eget nibh suspendisse urna pellentesque tortor nunc blandit condimentum placerat nunc dui turpis convallis a ac varius praesent sed tortor.",
    "Eleifend lacus consequat turpis. Arcu bibendum vel imperdiet tempor suspendisse dapibus faucibus, posuere consequat finibus arcu habitasse lacus magna id lectus feugiat hac ultricies tellus sed, integer. Tincidunt suspendisse sed metus tincidunt consequat facilisis laoreet porta nisl diam eleifend, amet luctus nunc vitae turpis vestibulum,. Pharetra aliquet platea ipsum est at urna ac a congue velit tortor tempor in dui diam sit justo vivamus venenatis magnis eros nulla elementum. Fringilla suscipit porta maximus libero diam praesent vestibulum nibh nullam massa."
]

const SubscribeModal = ({ open, setIsOpen, toggleSubscriptionStatus, subscribed }: SubscribeModalProps) => {
    const [show, setShow] = useState(open)
    const [message, setMessage] = useState(subscribed ? cancelSubscriptionMessage : subscriptionLegalDescription)
    useEffect(() => {
        setMessage(subscribed ? cancelSubscriptionMessage : subscriptionLegalDescription)
    }, [subscribed])
    useEffect(() => {
        if (typeof window === "undefined") return;
        setShow(open)
    }, [open])
    if (!show) return null;
    return (
        <>
            <div className={'absolute top-[40px] left-[50%] -translate-x-[50%] bg-[--surface-card] rounded-xl border border-[--surface-border] w-full max-w-[calc(100vw-6rem)] z-[999] px-8 py-6'}>
                <div className={'text-lg font-semibold'}>KleenBrake Subscription</div>
                <div className={'max-h-[calc(100vh-200px)] overflow-y-scroll my-4'}>{message.map((t) => {
                    return <div className={'indent-3 pr-1 mt-2'}>{t}</div>
                })}</div>
                <div className={'w-full flex flex-row justify-end items-center gap-4'}>
                    <Button label={subscribed ? "Go Back" : "Cancel"} severity={subscribed ? "info" : "danger"} onClick={() => setIsOpen(false)} />
                    {!subscribed ? <Button label="Subscribe" severity='success' onClick={toggleSubscriptionStatus} /> : <Button label="Cancel Subscription" severity='danger' onClick={toggleSubscriptionStatus} />
                    }
                </div>
            </div>
            <div className={'w-screen h-screen fixed top-0 left-0 bg-gray-800 bg-opacity-80 z-[998]'} onClick={() => setIsOpen(false)} />
        </>
    )
}


SubscribeModal.displayName = "SubscribeModal"


export default SubscribeModal;
