import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

const Link = () => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="whatsapp://send?text=Segurança no Trabalho ao atendimento dos infectados pelo COVID-19%0D%0A %0D%0AO ambiente hospitalar é um local onde se encontram muitos riscos (químicos, físicos, biológicos e entre outros). Por este motivo, o investimento em segurança do trabalho e a conscientização do uso correto dos EPIs ajudam a prevenir acidentes, doenças e controlar os riscos. %0D%0A %0D%0AAbaixo segue uma lista de EPIs necessários para um atendimento seguro os suspeitos ou infectados pelo novo coronavirus, bem como sua devida utilização.%0D%0A %0D%0A- gorro; %0D%0A- óculos de proteção ou protetor facial; %0D%0A- máscara %0D%0A- avental impermeável de mangas longas/capote; %0D%0A- luvas.  *Veja mais em:* http://www.anvisa.gov.br/servicosaude/manuais/seguranca_hosp.pdf"
  >
    <ShareIcon />
  </a>
);

const ProtocolCard2 = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="protocolCard">
      <Card className={classes.root}>
        <CardHeader
          action={
            <span style={{ cursor: "not-allowed" }}>
              <IconButton component={Link} aria-label="share"></IconButton>
            </span>
          }
          title="Segurança no Trabalho ao atendimento dos infectados pelo COVID-19"
          subheader="19/03/2020"
        />
        <CardMedia
          className={classes.media}
          image="https://telemedicinamorsch.com.br/wp-content/uploads/2019/01/seguranca-do-trabalho-hospitais-o-que-e.jpg"
          title="Enfermagem"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            O ambiente hospitalar é um local onde se encontram muitos riscos
            (químicos, físicos, biológicos e entre outros). Entenda como
            utilizar os EPI's.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              O ambiente hospitalar é um local onde se encontram muitos riscos
              (químicos, físicos, biológicos e entre outros). Por este motivo, o
              investimento em segurança do trabalho e a conscientização do uso
              correto dos EPIs ajudam a prevenir acidentes, doenças e controlar
              os riscos.
            </Typography>
            <Typography paragraph>
              Abaixo segue uma lista de EPIs necessários para um atendimento
              seguro os suspeitos ou infectados pelo <b>novo coronavirus</b>,
              bem como sua devida utilização.
            </Typography>
            <Typography paragraph>
              - gorro;
              <br />
              - óculos de proteção ou protetor facial;
              <br />
              - máscara <br />
              - avental impermeável de mangas longas/capote;
              <br />
              - luvas.
              <br />
            </Typography>
            <Typography paragraph>
              <a
                href="http://www.anvisa.gov.br/servicosaude/manuais/seguranca_hosp.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Veja a Fonte
              </a>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
export default ProtocolCard2;
