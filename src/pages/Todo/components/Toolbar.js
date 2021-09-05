import { useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { ToolbarItem, Container, Center, Left, Right, ActiveItem, Item } from '../Todo.styles';
export default function Toolbar(props) {
  const {
    isActiveView = false,
    onToggleAllTodo = () => { },
    onClickTab = () => { },
    listStatus = [],
    onDeleteAllTodo = () => { }
  } = props;
  const [active, setActive] = useState(listStatus[0].value);
  return (
    <Container>
      <Left
        style={{}}
        className="cursor-pointer"
        onClick={() => {
          onToggleAllTodo(!isActiveView);
        }}
        title='Mark all done'
      >
        {isActiveView ? (
          <ImCheckboxChecked color='green' />
        ) : (
          <ImCheckboxUnchecked color='green' />
        )}
      </Left>
      <Center className='flex-center'>
        {listStatus &&
          listStatus.length &&
          listStatus.map((v, i) => {
            return (
              <ToolbarItem
                key={i}
                onClick={() => {
                  setActive(v.value)
                  onClickTab(v.value)
                }}
              >
                {active === v.value ? <ActiveItem>{v.label}</ActiveItem> : <Item>
                  {v.label}
                </Item>}
              </ToolbarItem>
            );
          })}
      </Center>

      <Right
        className="cursor-pointer"
        onClick={onDeleteAllTodo}
        title='Clear all todo list'
      >
        <MdDelete color='red' />
      </Right>
    </Container>
  );
}
