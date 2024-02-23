import { Button, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

const TabButton = ({tabName, currentTab, setCurrentTab}) => {

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
      const isNotMobile = useMediaQuery({ minWidth: 768 })
      return isNotMobile ? children : null
  }

  return (
    <>
      <Default>
        <Button
          className={currentTab === tabName ? "tabButton active" : "tabButton"}
          key={tabName}
          onClick={() => setCurrentTab(tabName)}
          sx={{ m: 2, color: 'white', display: 'block', fontWeight: 'bold' }}
        >
          {tabName}
        </Button>
      </Default>
      <Mobile>
        <Button
          className={currentTab === tabName ? "tabButton active" : "tabButton"}
          key={tabName}
          onClick={() => setCurrentTab(tabName)}
          sx={{ color: 'white', display: 'block', fontWeight: 'bold' }}
        >
          <Typography sx={{ fontSize: '12px' }}>{tabName}</Typography>
        </Button>
      </Mobile>
    </>
  )
}

export default TabButton