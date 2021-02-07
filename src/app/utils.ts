

// just a bunch of utility functions and classes

import { DocumentChangeAction } from '@angular/fire/firestore' 

export function propriate_array(snapshot_array:DocumentChangeAction<any>[], 
                                    target_array:any[]): void {
    snapshot_array.map(
        doc => {
            let r:any = {}
            r.id = doc.payload.doc.id;
            r.data = doc.payload.doc.data();

            let index_in_target = target_array.findIndex( target_array_doc => target_array_doc.id == r.id )
            console.log(index_in_target, r.id)

            if(doc.type === 'removed')
                target_array.splice(index_in_target,1)
            else if(doc.type === 'modified')
                target_array.splice(index_in_target,1,r)
            else if(doc.type == 'added' && index_in_target == -1)
                target_array.push(r)
        })

}