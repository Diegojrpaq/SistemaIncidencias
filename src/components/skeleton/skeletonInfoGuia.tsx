import { Card, CardBody, CardHeader, Chip, Divider, Skeleton } from '@nextui-org/react'
import React from 'react'

const SkeletonInfoGuia = () => {
    return (
        <div className="flex flex-col gap-3 p-4">
            <Card>
                <CardHeader className="flex gap-3">
                    <div className="flex items-center gap-2 ml-3">
                        <Skeleton className="h-6 w-32 rounded-md" />
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="grid grid-cols-2 gap-5 p-2">
                        {/* Columna izquierda */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                        </div>
                        {/* Columna derecha */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>


            <Card>
                <CardHeader className="flex gap-3">
                    <div className="flex items-center gap-2 ml-3">
                        <Skeleton className="h-6 w-32 rounded-md" />
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="grid grid-cols-auto">
                        <div className="flex flex-col gap-2 p-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-24 rounded-md" />
                                <Skeleton className="h-4 w-48 rounded-md" />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>


            <Card>
                <CardHeader className="flex gap-3">
                    <div className="flex items-center gap-2 ml-3">
                        <Skeleton className="h-6 w-32 rounded-md" />
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex justify-center w-full items-center">
                        <div className="grid grid-cols-2 items-center gap-2">
                            <Skeleton className="h-40 w-48 rounded-md" />
                            <Skeleton className="h-40 w-48 rounded-md" />
                            <Skeleton className="h-40 w-48 rounded-md" />
                            <Skeleton className="h-40 w-48 rounded-md" />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default SkeletonInfoGuia
