import React from 'react'
import { Button } from '@nextui-org/button';


type Props = {}

export default function page({ }: Props) {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <div>
        <Button>Click me</Button>
      </div>
    </>
  )
}