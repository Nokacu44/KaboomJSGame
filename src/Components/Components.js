import kaboom from "kaboom"

export function dialog(dialogs){
    let textbox = null
    let dialog_text = null
    let curDialog = -1
  
    const offestBox = vec2(25,25)
    const offsetText = vec2(125,50)
    return {
        id:"dialog",
        load(){
          textbox = add([
            rect(256,64, { radius: 32 }),
            origin("botright"),
            pos(offestBox),
          ])
          dialog_text = add([
            text("", { size: 16, width: 200 }),
            pos(offsetText),
            origin("botright")
          ])

          textbox.hidden = true
          dialog_text.hidden = true

          onKeyPress('e',() => {
            if (textbox.hidden == false){
              this.udpateDialog()
            }
          })
        },
      // permette di lanciare il dialogo
      udpateDialog(){
        textbox.pos = this.pos.sub(offestBox)
        dialog_text.pos = this.pos.sub(offsetText)
        curDialog = (  curDialog + 1) %   dialogs.length
        // Update the dialog text
        dialog_text.text = dialogs[  curDialog ]

        textbox.hidden = false
        dialog_text.hidden = false
      }, 
      closeDialog(){
        textbox.hidden = true
        dialog_text.hidden = true
        curDialog = -1
      }
    }
}
  
export function InteractArea(areaTransform,areaOrigin, tag ,onInteraction){
    let areaEffect = null
    return {
        id:"InteractArea",
        load(){
            areaEffect = add([
                pos(this.pos),
                area(areaTransform),
                origin(areaOrigin)
            ])

            areaEffect.onCollide(tag,onInteraction)
        },
        update(){
          // Update every frame
          areaEffect.pos = this.pos

        }
    }
}

export function dialogInteraction(areaTransform,areaOrigin, tag ){
    let areaEffect = null
    let playerRefrence = null
    return {
        id:"dialogInteraction",
        require:["dialog"],
        add(){
            areaEffect = add([
                pos(this.pos),
                area(areaTransform),
                origin(areaOrigin)
            ])

            areaEffect.onCollide(tag,() => {
                this.udpateDialog()
            })

        },
        update(){
          // Update every frame
          if (playerRefrence == null){
            playerRefrence = get("player").pop();
          }
          areaEffect.pos = this.pos

          if (!areaEffect.isColliding(playerRefrence)){
            this.closeDialog()
          }
          


        }
    }
}
  
export function InputMovementLateral(speed){
    return {
        load(){
            onKeyDown('d',() =>{
                this.move(speed,0)
            })
    
            onKeyDown('a',() =>{
                this.move(-speed,0)
            })
        }

    }
}


export function InputMovementVertical(speed){
  return {
      load(){
          onKeyDown('w',() =>{
              this.move(0,-speed)
          })
  
          onKeyDown('s',() =>{
              this.move(0,speed)
          })
      }

  }
}

export function InputJump(force){
  return {
    load(){
      onKeyPress('space',()=>{
        if (this.isGrounded()) this.jump(800)
      })
    }
  }
}