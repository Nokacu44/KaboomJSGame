import kaboom from "kaboom"

let curDraggin = null
function drag() {

	// The displacement between object pos and mouse pos
	let offset = vec2(0)

	return {
		// Name of the component
		id: "drag",
		// This component requires the "pos" and "area" component to work
		require: [ "pos", "area", ],
		// "add" is a lifecycle method gets called when the obj is added to scene
		add() {
			// TODO: these need to be checked in reverse order
			// "this" in all methods refer to the obj
			this.onClick(() => {
				if (curDraggin) {
					return
				}
				curDraggin = this
				offset = mousePos().sub(this.pos)
				// Remove the object and re-add it, so it'll be drawn on top
				readd(this)
			})
		},
		// "update" is a lifecycle method gets called every frame the obj is in scene
		update() {
			if (curDraggin === this) {
				cursor("move")
				this.pos = mousePos().sub(offset)
			}
		},
	}

}

// drop
onMouseRelease(() => {
	curDraggin = null
})
function itemCells(quantity = 1, offsetX = 0, offsetY = 0){
	let cells = []
	const offX = offsetX
	const offY = offsetY
	return {
		id:"itemCells",
		
		load(){
			let owner = this
			for(i=0;i<quantity;i++){
				const cell = add([
					rect(32,32), 
					color(BLACK), 
					z(2), 
					pos(offX,offY + (i * 32) * 1.2),
					area(),
					{
						selected: false,
						offsetPos:vec2(0),
						update(){
							this.pos = owner.pos.add(this.offsetPos)
							this.hidden = owner.hidden
							if (this.isHovering() && !this.selected){
								this.color = GREEN
							} else if (!this.isHovering()) {
								this.color = BLACK
								this.selected = false
							}							
						}
					}
				])
				cell.onClick(() => {
					// debug
					cell.selected = true
					cell.color = BLUE
				})
				cell.offsetPos = cell.pos
				cells.push(cell)
			}
		},
	}
}
const inventory = [
	rect(256,256 * 1.5),
	itemCells(7,12,12),
	drag(),
	area(),
	pos(0,0)
]

onKeyPress('i', () => {
	inventory.hidden = !inventory.hidden
})


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
    let owner = null;
    return {
        id:"InteractArea",
        load(){
            areaEffect = add([
                pos(this.pos),
                area(areaTransform),
                origin(areaOrigin)
            ])
            owner = this;
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