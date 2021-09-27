import { LightningElement,track } from 'lwc';
import insertBuildingMethod from '@salesforce/apex/addBuildApexClass.insertBuildingMethod';
import buildingName from '@salesforce/schema/Buildings__c.Name';
import buildingAddress from '@salesforce/schema/Buildings__c.Address__c';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class InsertAccountLwc extends LightningElement 
{
    @track buildingid;
    @track error;
    @track getBuildingRecord={
         Name:buildingName ,
         Address__c:buildingAddress
        };

    nameInpChange(event)
    {
        this.getBuildingRecord.Name=event.target.value;
    }

    addressInpChange(event)
    {
        this.getBuildingRecord.Address__c=event.target.value;
    }
   
    saveBuildingAction()
    {
        //window.console.log('before save' + this.createAccount);
        if(this.Name==null || this.Name=='' && this.Address__c==null || this.Address__c=='')
        {
            
        insertBuildingMethod({buildingObj:this.getBuildingRecord})
        .then(result=>{
            //window.console.log(this.createAccount);
            this.getBuildingRecord={};
            this.buildingid=result.Id;
            //window.console.log('after save' + this.buildingid);

            const toastEvent=new ShowToastEvent({
                title:'Success!',
                message:'Building Record created successfully',
                variant:'success'

            });
            this.dispatchEvent(toastEvent);
        })
    
        .catch( error=>{
            alert( 'empty text box' );
            const toastEvent=new ShowToastEvent({
                title:'Fail!',
                message:'Building Record Failed',
                variant:'success'

            });
            
            this.error=error.message;
            window.console.log(this.error);
            this.dispatchEvent(toastEvent);
        }

        );
    }
    }
}
