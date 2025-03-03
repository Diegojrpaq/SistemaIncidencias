import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    Image
} from "@nextui-org/react"

function Evidencia() {
    return (
        <Card>
            <CardHeader className="flex gap-3">
                <div className="flex items-center gap-2 ml-3">
                    <p className="text-lg">Evidencia</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex justify-center w-full items-center">
                    <div className="grid grid-cols-2 items-center gap-2">
                        <Image
                            width={200}
                            alt="NextUI hero Image"
                            src="https://nextui.org/images/hero-card-complete.jpeg"
                        />
                        <Image
                            width={200}
                            src="https://app.requestly.io/delay/1000/https://nextui.org/images/fruit-4.jpeg"
                            fallbackSrc="https://via.placeholder.com/300x200"
                            alt="NextUI Image with fallback"
                        />
                        <Image
                            width={200}
                            alt="NextUI hero Image"
                            src="https://nextui.org/images/hero-card-complete.jpeg"
                        />
                        <Image
                            width={200}
                            alt="NextUI hero Image"
                            src="https://nextui.org/images/hero-card-complete.jpeg"
                        />
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default Evidencia
