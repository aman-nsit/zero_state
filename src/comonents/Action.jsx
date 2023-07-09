import React, { useState } from 'react'
import { Typography} from 'antd';
import billCalculator from '../service/service';
const members = new Map();
// let expense=0;
function getBackgroundColor(member) {
  if (member[0] > 0) {
    return 'rgb(74, 141, 57)';
  } else if (member[0] < 0) {
    return 'rgb(232, 78, 78)';
  }
  return 'Transparent';
}
function Action() {
  // const members=[];
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [amount, setAmount] = useState('');
  const [memberList, setMemberList] = useState(null);
  // const [memberList2, setMemberList2] = useState(null);
  const [res,getRes] = useState();
  const handleSubmit = (e) =>{
    e.preventDefault();
    const member1 = e.target[0].value.toUpperCase();
    const amount =parseFloat( e.target[1].value );
    const member2 = e.target[2].value.toUpperCase();
    if(member1!==member2){
    if(members.has(member1) && members.has(member2)){
      let temp1=members.get(member1);
      let temp2=members.get(member2);
      members.set(member1,temp1+amount);
      members.set(member2,temp2-amount);
    }
    else if(members.has(member1)){
      let temp=members.get(member1);
      members.set(member1,temp+amount);
      members.set(member2,-amount);
    }
    else if(members.has(member2)){
      members.set(member1,amount);
      let temp=members.get(member2);
      members.set(member2,temp-amount);
    }
    else {
      members.set(member1,amount);
      members.set(member2,-amount);
    }
  }
    // expense+=amount;
    // members.push({member,amount});
    setName1('');
    setName2('');
    setAmount('');
    getRes();
    let newMemberList=[];
    for (let [member,amount] of members) {
        if(amount!==0)newMemberList.push([amount, member]);
    }
    newMemberList.sort();
    if(newMemberList.length!==0)setMemberList(newMemberList);
  }
    const handleSplitBills = (e) => {
    // console.log(members);
      if(members){ 
        const billresult=billCalculator(members);
        console.log(billresult);
        if(billresult.length)getRes(billresult);
      }
  }
  const handleReset =(e) =>{
    getRes();
    setMemberList(null);
    // setMemberList2(null);
    members.clear();
  }
  return (
    <div className='container'>
      <div className="form-group">
          <form action="" onSubmit={handleSubmit}>
            <Typography.Title level={4}>Exchange Details</Typography.Title>
            <input type="text" value={name1} onChange={(e) => setName1(e.target.value) } placeholder='Money Given By' required/>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount Given' required />
            <input type="text" value={name2} onChange={(e) => setName2(e.target.value) } placeholder='Taken By' required/>
            <button>Add Member</button>
          </form>
      </div>
      {(memberList && !res) && (
        <div className="member-list">
        <ul className='member-item' style={{maxHeight: '250px'}}>
        <div><b><li><div>Member</div>Amount</li></b></div>
        {memberList.map((member, index) => (
                  <li key={index}>
                  {member[1]}<div style={{ backgroundColor: getBackgroundColor(member) ,borderRadius:'5px', padding:'5px'}}>
                    {member[0]>0 ? <div>Rs {member[0]}</div> : <div>Rs {member[0]-2*member[0]}</div>} 
                  </div>
                </li>
                ))}
            </ul>
          </div>
        )}
        <div className='data'>    
          <button onClick={handleSplitBills}>Settle Up</button>
          <button onClick={handleReset}>Reset</button>
          {res && <div className="member-list" style={{maxHeight: '250px'}}>
          <ul className='member-item'>
            {res && <b><li>Payer<div>Amount</div>Reciever</li></b>}
            {res.map((member) => (
              <li  key={member}>
                <div style={{backgroundColor:'red',padding:'5px', borderRadius:'5px'}}>{member[0]}</div> 
                <div style={{backgroundColor:'gold',padding:'5px', borderRadius:'5px'}}>  Rs {member[2].toFixed(2)} 
                </div> <div style={{backgroundColor:'#5ccc25',padding:'5px', borderRadius:'5px'}}>{member[1]}</div>
              </li>
            ))}
          </ul>
        </div>}
      </div>
    </div>
  )
}
export default Action


