import { style } from 'typestyle'

export const lineStyle = style({
  display: 'flex',
  padding: '10px 20px',
  height: '45px'
})

export const displayStyle = style({
  width: '600px',
  maxWidth: '90vw',
  backgroundColor: 'whitesmoke',
  boxShadow: '3px 3px 3px lightgray',
  margin: '20px'
})

export const dividerStyle = style({
  width: '100%',
  height: 0,
  borderTop: '1px dotted lightgrey'
})

const tokenCommon = {
  fontSize: '20px',
  fontFamily: 'Courier',
  padding: '10px 16px',
  margin: '2px',
  borderRadius: '25px',
  textAlign: 'center'
}

export const numberStyle = style(
  tokenCommon,
  {
    background: 'paleturquoise',
    display: 'flex'
  }
)

export const operatorStyle = style(tokenCommon, { background: 'lightblue' })
export const equalsStyle = style(tokenCommon, { background: 'palegreen' })
export const clearStyle = style(tokenCommon, { background: 'pink' })
