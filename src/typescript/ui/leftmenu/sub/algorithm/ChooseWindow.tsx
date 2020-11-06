import * as React from "react"
import * as Framer from "framer"
import { ButtonLine } from "../lines/ButtonLine"
import * as DataCenter from "../../../../data/dataCenter"
import * as WebInterface from "../../../../web/webinterface"
import { RadioButtonLine } from "../lines/RadioButtonLine"

export function ChooseWindow(props: { onEnded: () => void }) {
    const names = WebInterface.listAlgorithms()
    const [chosenName, setChosenName] = React.useState(names[0])

    React.useEffect(() => {
        console.log(chosenName)
    }, [chosenName])

    function ok() {
        let setup = DataCenter.getSetup()
        setup.algorithm = chosenName
        DataCenter.updateSetup(setup)
        props.onEnded()
    }

    function cancle() {
        props.onEnded()
    }

    function onChosen(event) {
        setChosenName(event.target.value)
    }

    return (<Framer.Stack
        width="100%"
        height="100%"
        direction="vertical"
        distribution="start"
        alignment="center"
        padding={8}
        gap={8}
    ><Framer.Scroll
        width="100%"
        height="1fr">
            <Framer.Stack
                width="100%"
                height={names.length * 56}
                direction="vertical"
                distribution="start"
                alignment="center"
                gap={8}
                onChange={onChosen}
            >
                {names.map(name => (
                    <RadioButtonLine label={name} groupName="algorithm" />
                ))}
            </Framer.Stack>
        </Framer.Scroll>
        <ButtonLine label="OK" functionality={ok} />
        <ButtonLine label="Cancle" functionality={cancle} />
    </Framer.Stack>
    )
}